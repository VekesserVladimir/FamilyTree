using Microsoft.AspNetCore.Mvc;

namespace FamilyWiki.Web.Features.Article
{
    [Route("")]
    public class ArticleController : Controller
    {
        [HttpGet("")]
        [HttpGet("/{name}")]
        public ActionResult Article(string name)
        {
            return View(model: new ArticleModel {Content = name, Title = name});
        }
    }
}