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
    [ServiceContract]
    public interface IStoneScadaService
    {  
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json,
            BodyStyle=WebMessageBodyStyle.Wrapped,
            UriTemplate="driver/{driver}?get={tagname}")]
        string Get(string driver,string tagname);
    }

    public class StoneScadaService : IStoneScadaService
    {
        public string Get(string driver, string tagname)
        {
            var rand = new Random();
            if (tagname == "test") { return Convert.ToString(rand.Next()); }
            return "N";
        }
    }

    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            // Create SelfHosted Webservice
            Uri baseAddress = new Uri("http://localhost:8080/stonescada");

            // Create the ServiceHost.
            using (ServiceHost host = new ServiceHost(typeof(StoneScadaService), baseAddress))
            {
                // Enable metadata publishing.
                ServiceMetadataBehavior smb = new ServiceMetadataBehavior();
                smb.HttpGetEnabled = true;
                smb.MetadataExporter.PolicyVersion = PolicyVersion.Policy15;
                host.Description.Behaviors.Add(smb);    
                
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
