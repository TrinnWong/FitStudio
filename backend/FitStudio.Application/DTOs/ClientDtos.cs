using System;

namespace FitStudio.Application.DTOs
{
    public class ClientDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Credits { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class RegisterClientRequest
    {
        public string Username { get; set; } = string.Empty; // Will be encrypted
        public string Password { get; set; } = string.Empty; // Will be hashed
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
