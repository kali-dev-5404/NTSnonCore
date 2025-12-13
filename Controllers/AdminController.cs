using System.Web.Mvc;

namespace NTSnonCoreWebApp.Controllers
{

}
public class AdminController : Controller
{
    public ActionResult CreateUser()
    {
        ViewData["Title"] = "Create User | Admin | NTS";
        ViewData["PageHeading"] = "Create User";
        ViewData["PageSubtitle"] = "Manage organisation details";

        return View();
    }

    public ActionResult UserList()
    {
        ViewData["Title"] = "User List | Admin | NTS";
        ViewData["PageHeading"] = "User List";
        ViewData["PageSubtitle"] = "Manage branches";

        return View();
    }

    public ActionResult UserAccess()
    {
        ViewData["Title"] = "User Access | Admin | NTS";
        ViewData["PageHeading"] = "User Access";
        ViewData["PageSubtitle"] = "Manage locations";

        return View();
    }
    public ActionResult RoleAccess()
    {
        ViewData["Title"] = "Role Access | Admin | NTS";
        ViewData["PageHeading"] = "Role Access";
        ViewData["PageSubtitle"] = "Manage role access";

        return View();
    }

}
