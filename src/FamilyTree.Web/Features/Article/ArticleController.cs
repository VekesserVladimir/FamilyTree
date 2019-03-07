using Microsoft.AspNetCore.Mvc;

namespace FamilyTree.Web.Features.Article
{
    [Route("")]
    public class ArticleController : Controller
    {
        [HttpGet("")]
        [HttpGet("/{name}")]
        public ActionResult Article(string name)
        {
            return View(new ArticleModel { Content = name, Title = name });
        }
    }
}