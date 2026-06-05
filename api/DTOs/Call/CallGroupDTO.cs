namespace api.DTOs.Call
{
    public class CallGroupDTO
    {
        public string TechnicianName { get; set; } = string.Empty;
        public List<CallDTO> Calls { get; set; } = new List<CallDTO>();
    }
}
