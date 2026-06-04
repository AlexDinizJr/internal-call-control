using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Entities;

namespace api.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }
        
        public DbSet<Call> Calls { get; set; }
        public DbSet<Technician> Technicians { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // cascading delete when a technician is deleted, all associated calls will also be deleted
            modelBuilder.Entity<Call>()
                .HasOne(c => c.Technician)
                .WithMany(t => t.Calls)
                .HasForeignKey(c => c.TechnicianId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}