using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Risk_REST.Models;

namespace Risk_REST.Services.Data
{
    public partial class Risk_Antwerp_dbContext : DbContext
    {
        public Risk_Antwerp_dbContext()
        {
        }

        public Risk_Antwerp_dbContext(DbContextOptions<Risk_Antwerp_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Area> Area { get; set; }
        public virtual DbSet<Players> Players { get; set; }
        public virtual DbSet<Positions> Positions { get; set; }
        public virtual DbSet<Teams> Teams { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=risk-antwerp.database.windows.net,1433;Initial Catalog=Risk_Antwerp_db;Persist Security Info=False;User ID=Risk_Antwerp;Password=R1sk_4ntw3rp;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Area>(entity =>
            {
                entity.Property(e => e.AreaId).ValueGeneratedNever();

                entity.Property(e => e.AreaName).HasMaxLength(40);

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Area)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__Area__TeamId__4F7CD00D");
            });

            modelBuilder.Entity<Players>(entity =>
            {
                entity.HasKey(e => e.PlayerId);

                entity.Property(e => e.PlayerId).ValueGeneratedNever();

                entity.Property(e => e.AuthId)
                    .HasColumnName("Auth_Id")
                    .HasMaxLength(100);

                entity.Property(e => e.PlayerEmail).HasMaxLength(100);

                entity.Property(e => e.PlayerTitle).HasMaxLength(70);

                entity.Property(e => e.PlayerUsername).HasMaxLength(100);

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.AreaId)
                    .HasConstraintName("FK__Players__AreaId__534D60F1");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Players)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__Players__TeamId__52593CB8");
            });

            modelBuilder.Entity<Positions>(entity =>
            {
                entity.HasKey(e => e.PositionId);

                entity.Property(e => e.PositionId).ValueGeneratedNever();

                entity.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");

                entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Positions)
                    .HasForeignKey(d => d.AreaId)
                    .HasConstraintName("FK__Postition__AreaI__4D94879B");
            });

            modelBuilder.Entity<Teams>(entity =>
            {
                entity.HasKey(e => e.TeamId);

                entity.Property(e => e.TeamId).ValueGeneratedNever();

                entity.Property(e => e.TeamColor).HasMaxLength(20);
            });
        }
    }
}
