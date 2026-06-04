using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class Technician
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<Call> Calls { get; set; } = new List<Call>();
    }
}