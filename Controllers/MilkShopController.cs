using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class MilkShopController : Controller
    {
        public ActionResult DairyShop()
        {
            ViewData["Title"] = "Dairy Shop | Milk Shop | NTS";
            ViewData["PageHeading"] = "Dairy Shop";
            ViewData["PageSubtitle"] = "Manage dairy listings";

            return View();
        }

        public ActionResult DairyList()
        {
            ViewData["Title"] = "Dairy List | Milk Shop | NTS";
            ViewData["PageHeading"] = "Dairy List";
            ViewData["PageSubtitle"] = "Manage dairy listings";

            return View();
        }
    }
}
