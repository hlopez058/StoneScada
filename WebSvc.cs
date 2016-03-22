using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.ServiceModel.Web;
namespace StoneScada
{
   
    [ServiceContract]
    public interface IStoneScadaService
    {
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "{driver}/get={tagname}")]
        string Get(string driver, string tagname);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "{driver}/set={tagname}:{value}")]
        string Set(string driver, string tagname,string value);

    }
 
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single,ConcurrencyMode = ConcurrencyMode.Single)]
    public class StoneScadaService : IStoneScadaService
    {
        public iomodbus ioModbus;
        public StoneScadaService()
        {
            ioModbus = new iomodbus();
        }

        public class DriverResult
        {
            public string tagname;
            public string value;
        }
        public Random rand = new Random();
        public string Get(string driver, string tagname)
        {
            var result = "na";
    
            //use modbus driver to read the value
            result = string.Format("%f",ioModbus.GetValue(tagname,2));
            
            var resobj = new DriverResult() { tagname = tagname, value = result };
            
            return Newtonsoft.Json.JsonConvert.SerializeObject(resobj);
        }
        public string Set(string driver, string tagname,string value)
        {
            var result = "na";

            if (tagname == "test") { result = value; }

            var resobj = new DriverResult() { tagname = tagname, value = result };

            return Newtonsoft.Json.JsonConvert.SerializeObject(resobj);
        }
    }
}
