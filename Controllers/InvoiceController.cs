using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
    public class InvoiceController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Invoice | NTS";
            ViewBag.PageHeading = "Invoice";
            ViewBag.PageSubtitle = "Overview of your invoices";
            return View();
        }
    }
}
