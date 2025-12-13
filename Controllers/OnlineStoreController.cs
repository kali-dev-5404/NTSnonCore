using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class OnlineStoreController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Online Store | NTS";
            ViewBag.PageHeading = "Online Store";
            ViewBag.PageSubtitle = "Overview of your online store";
            return View();
        }
    }
}
