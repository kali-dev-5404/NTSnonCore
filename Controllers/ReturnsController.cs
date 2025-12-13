using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class ReturnsController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Returns | NTS";
            ViewBag.PageHeading = "Returns";
            ViewBag.PageSubtitle = "Overview of your returns";
            return View();
        }
    }
}
