using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{

    public class MasterController : Controller
    {
        public ActionResult Organisation()
        {
            ViewData["Title"] = "Organisation | Master | NTS";
            ViewData["PageHeading"] = "Organisation";
            ViewData["PageSubtitle"] = "Manage organisation details";

            return View();
        }

        public ActionResult Addorganisation()
        {
            ViewData["Title"] = "Add Organisation | Master | NTS";
            ViewData["PageHeading"] = "Add Organisation";
            ViewData["PageSubtitle"] = "Create new organisation with basic details";

            return View();
        }

        public ActionResult Branch()
        {
            ViewData["Title"] = "Branch | Master | NTS";
            ViewData["PageHeading"] = "Branch";
            ViewData["PageSubtitle"] = "Manage branches";

            return View();
        }

        public ActionResult Location()
        {
            ViewData["Title"] = "Location | Master | NTS";
            ViewData["PageHeading"] = "Location";
            ViewData["PageSubtitle"] = "Manage locations";

            return View();
        }
    }
}