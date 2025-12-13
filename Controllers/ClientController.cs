using System.Web.Mvc;

namespace NTSnonCorewebapp.controllers
{
    public class ClientController : Controller
    {
        public ActionResult Customer()
        {
            ViewData["PageHeading"] = "Customer";
            ViewData["PageSubtitle"] = "Manage customers";
            return View();
        }

        public ActionResult Supplier()
        {
            ViewData["PageHeading"] = "Supplier";
            ViewData["PageSubtitle"] = "Manage suppliers";
            return View();
        }
    }
}
