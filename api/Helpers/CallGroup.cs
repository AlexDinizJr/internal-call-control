using api.Entities;

namespace api.Helpers
{
    public class CallGroup
    {
        public string TechnicianName { get; set; } = string.Empty;
        public List<Call> Calls { get; set; } = new List<Call>();
    }
}
