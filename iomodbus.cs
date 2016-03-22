using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoneScada
{
    class iomodbus
    {

        public EasyModbus.ModbusClient modbusClient;
        
        public iomodbus(){
            Config();

        }

        public float GetValue(string registerStart,int size)
        {

            var regValue = modbusClient.ReadHoldingRegisters(
                   Convert.ToInt32(registerStart) - 1,//offset by one , unknown root cause. discovered in testing.
                  size);

            float val;

            if (size == 2)
            {

                var buffer = new byte[4];

                buffer[0] = BitConverter.GetBytes(regValue[1])[0];
                buffer[1] = BitConverter.GetBytes(regValue[1])[1];
                buffer[2] = BitConverter.GetBytes(regValue[0])[0];
                buffer[3] = BitConverter.GetBytes(regValue[0])[1];

                val = BitConverter.ToSingle(buffer, 0);
            }
            else
            {
                val = Convert.ToSingle(regValue[0]);
            }

            return val;
        }
        
        public void Config(){

            //Create a global IO driver
            var timeout = 100;
            var plcip = "127.0.0.1";
            var port = 502;
            modbusClient = new EasyModbus.ModbusClient(plcip, port);
            modbusClient.ConnectionTimeout = timeout * 100;


        }

    }
}
