using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace StudentAdminApi.Repository
{
    public class LocalStorageImageRepository : IImageRepository
    {
        public async Task<string> Upload(IFormFile file, string fileName)
        {
            // fetching file path by combining cerrent directory url ,target folder and file name 
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"Resources\Images", fileName);
            // creating new file in target folder 
            using Stream fileStream = new FileStream(filePath, FileMode.Create);
            // copying file to newly created file
            await file.CopyToAsync(fileStream);
            // returning newly created  file path
            return GetServerRelativePath(fileName);
        }

        private string GetServerRelativePath(string fileName)
        {
            return Path.Combine(@"Resources\Images", fileName);
        }
    }
}
