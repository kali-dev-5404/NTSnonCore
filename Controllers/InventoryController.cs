using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class InventoryController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Inventory | NTS";
            ViewBag.PageHeading = "Inventory";
            ViewBag.PageSubtitle = "Overview of your inventory";
            return View();
        }
    }
}
