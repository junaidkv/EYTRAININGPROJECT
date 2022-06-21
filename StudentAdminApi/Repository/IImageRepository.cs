using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace StudentAdminApi.Repository
{
    public interface IImageRepository
    {
        Task<string> Upload(IFormFile file, string fileName);

    }
}
