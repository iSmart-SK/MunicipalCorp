using System;

namespace logger.Models
{
    public class LogEntry
    {
        public DateTime Timestamp { get; set; }

        public string Application { get; set; }   // SpringBoot / React
        public string Level { get; set; }         // INFO, WARN, ERROR
        public string Service { get; set; }       // UserService, AuthController
        public string Endpoint { get; set; }      // /user/login
        public string Method { get; set; }        // GET, POST
        public string Message { get; set; }       // Actual log message

        public string UserId { get; set; }        // User ID
        public string IpAddress { get; set; }     // IP Address
    }
}
