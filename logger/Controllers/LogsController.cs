using Microsoft.AspNetCore.Mvc;
using logger.Models;
using logger.Services;

namespace logger.Controllers
{
    [ApiController]
    [Route("api/logs")]
    public class LogsController : ControllerBase
    {
        private readonly InMemoryLogStore _logStore;

        public LogsController(InMemoryLogStore logStore)
        {
            _logStore = logStore;
        }

        // 🔹 POST: Add a new log
        [HttpPost]
        public IActionResult AddLog([FromBody] LogEntry log)
        {
            if (log == null)
                return BadRequest("Log entry is required");

            log.Timestamp = DateTime.UtcNow;

            _logStore.Add(log);

            return Ok(new { message = "Log stored successfully" });
        }

        // 🔹 GET: Get all logs
        [HttpGet]
        public IActionResult GetAllLogs()
        {
            return Ok(_logStore.GetAll());
        }

        // 🔹 GET: Get logs by level (INFO / WARN / ERROR)
        [HttpGet("level/{level}")]
        public IActionResult GetLogsByLevel(string level)
        {
            return Ok(_logStore.GetByLevel(level));
        }

        // 🔹 DELETE: Clear all logs (optional)
        [HttpDelete]
        public IActionResult ClearLogs()
        {
            _logStore.Clear();
            return Ok(new { message = "All logs cleared" });
        }
    }
}
