using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.ServiceModel.Web;
namespace StoneScada
{
  

    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {

            // Load DLL's from folder



            // Create SelfHosted Webservice
            Uri baseAddress = new Uri("http://localhost:8080/stonescada");

            // Create the ServiceHost.
            using (ServiceHost host = new ServiceHost(typeof(StoneScadaService), baseAddress))
            {
                // Open the ServiceHost to start listening for messages. Since
                // no endpoints are explicitly configured, the runtime will create
                // one endpoint per base address for each service contract implemented
                // by the service.
                host.Open();

                Console.WriteLine("The service is ready at {0}", baseAddress);
                
                // Create Form Visualizations
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new frmMain());
                
                // Close the ServiceHost.
                host.Close();
            }
        }
    }
}
