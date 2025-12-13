using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class EstimationController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Estimation | NTS";
            ViewBag.PageHeading = "Estimation";
            ViewBag.PageSubtitle = "Overview of your estimates";
            return View();
        }
    }
}
