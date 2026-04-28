using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitStudio.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUniqueStudioSlug : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Studios_Slug",
                table: "Studios");

            migrationBuilder.CreateIndex(
                name: "IX_Studios_Slug",
                table: "Studios",
                column: "Slug");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Studios_Slug",
                table: "Studios");

            migrationBuilder.CreateIndex(
                name: "IX_Studios_Slug",
                table: "Studios",
                column: "Slug",
                unique: true);
        }
    }
}
