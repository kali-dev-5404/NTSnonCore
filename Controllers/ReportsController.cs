using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class ReportsController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Reports | NTS";
            ViewBag.PageHeading = "Reports";
            ViewBag.PageSubtitle = "Overview of your reports";
            return View();
        }
    }
}
