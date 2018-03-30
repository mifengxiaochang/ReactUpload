
namespace Upload.Controller
{
  
    [RoutePrefix("api/upload")]
   
    public class DataManagerController : ApiController
    {
        
        public IMPlatformRecoveryService MPlatformRecoveryService { get; set; }

        #region Tansfer
      
        [HttpPost, Route("upgradefile")]
        public void UpgradeImportFileData(UploadSFileDto upgradeFileDto)
        {
            UpgradeDto upgradeDto = new UpgradeDto();

            upgradeDto = upgradeFileDto.upgradeDto;
            upgradeDto.JsonFile = new byte[upgradeFileDto.fileData.Count];
            for (int i = 0; i < upgradeFileDto.fileData.Count; i++)
            {
                upgradeDto.JsonFile[i] = (byte)(upgradeFileDto.fileData[i]);
            }           

            UpgradeImportData(upgradeDto);
        }



        #endregion

        #region Import
        
        [HttpPost, Route("upgtadeplatform")]
        public string UpgradeImportData(PlatformUpgradeParamDto dto)
        {
            return MPlatformRecoveryService.UpgradeImportData(dto.paramDto, dto.notificationId);
        }
       
        #endregion

    public class UploadSFileDto
    {
        public Dictionary<int, int> fileData
        {
            get; set;
        }
        public UpgradeDto upgradeDto { get; set; }
    }

}
