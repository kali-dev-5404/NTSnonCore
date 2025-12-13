using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{
  public class TractorController : Controller
  {
    public ActionResult Index()
    {
      ViewData["Title"] = "Tractor";
      ViewData["Page"] = "tractor";
      return View();
    }

    public ActionResult Rent()
    {
      ViewData["Title"] = "Tractor Rent";
      ViewData["Page"] = "tractorrent";
      return View();
    }

    public ActionResult RentByCustomer()
    {
      ViewData["Title"] = "Tractor Rent by Customer";
      ViewData["Page"] = "tractorrentbycustomer";
      return View();
    }
  }
}
