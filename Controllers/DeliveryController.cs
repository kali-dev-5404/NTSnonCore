using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class DeliveryController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Delivery | NTS";
            ViewBag.PageHeading = "Delivery";
            ViewBag.PageSubtitle = "Overview of your delivery operations";
            return View();
        }
    }
}
