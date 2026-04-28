using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitStudio.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGymClassCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassName",
                table: "Schedules");

            migrationBuilder.AddColumn<Guid>(
                name: "GymClassId",
                table: "Schedules",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "GymClasses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClassType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    StudioId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GymClasses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GymClasses_Studios_StudioId",
                        column: x => x.StudioId,
                        principalTable: "Studios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_GymClassId",
                table: "Schedules",
                column: "GymClassId");

            migrationBuilder.CreateIndex(
                name: "IX_GymClasses_StudioId",
                table: "GymClasses",
                column: "StudioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_GymClasses_GymClassId",
                table: "Schedules",
                column: "GymClassId",
                principalTable: "GymClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_GymClasses_GymClassId",
                table: "Schedules");

            migrationBuilder.DropTable(
                name: "GymClasses");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_GymClassId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "GymClassId",
                table: "Schedules");

            migrationBuilder.AddColumn<string>(
                name: "ClassName",
                table: "Schedules",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
