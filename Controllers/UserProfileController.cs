using System.Web.Mvc;

namespace NTSnonCorewebapp.controllers
{
    public class UserProfileController : Controller
    {
        public ActionResult Profile()
        {
            ViewData["Title"] = "Profile | User | NTS";
            ViewData["PageHeading"] = "Profile";
            ViewData["PageSubtitle"] = "User profile information";

            return View();
        }

        public ActionResult Settings()
        {
            ViewData["Title"] = "Settings | User | NTS";
            ViewData["PageHeading"] = "Settings";
            ViewData["PageSubtitle"] = "Manage your preferences";

            return View();
        }

        // Note: Implement your sign-out logic here (e.g., SignOutAsync) when auth is added.
        public ActionResult Logout()
        {
            return RedirectToAction("Index", "Dashboard");
        }
    }
}
