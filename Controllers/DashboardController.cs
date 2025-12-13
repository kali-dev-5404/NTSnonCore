using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class DashboardController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Dashboard | NTS";
            ViewBag.PageHeading = "Dashboard";
            ViewBag.PageSubtitle = "Overview of your business";
            return View();
        }
    }
}
