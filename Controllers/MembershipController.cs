using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class MembershipController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Membership | NTS";
            ViewBag.PageHeading = "Membership";
            ViewBag.PageSubtitle = "Overview of your membership";
            return View();
        }
    }
}
