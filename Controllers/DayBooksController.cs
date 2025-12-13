using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class DayBooksController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Day Books | NTS";
            ViewBag.PageHeading = "Day Books";
            ViewBag.PageSubtitle = "Overview of your Day Books";
            return View();
        }
    }
}
