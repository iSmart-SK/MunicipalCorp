using System.Collections.Concurrent;
using logger.Models;

namespace logger.Services
{
    public class InMemoryLogStore
    {
        // Thread-safe in-memory log storage
        private readonly ConcurrentQueue<LogEntry> _logs = new();

        // Add a new log
        public void Add(LogEntry log)
        {
            _logs.Enqueue(log);
        }

        // Get all logs
        public IEnumerable<LogEntry> GetAll()
        {
            return _logs.ToList();
        }

        // Get logs by level (INFO / WARN / ERROR)
        public IEnumerable<LogEntry> GetByLevel(string level)
        {
            return _logs
                .Where(l => l.Level != null &&
                            l.Level.Equals(level, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        // Clear logs 
        public void Clear()
        {
            while (_logs.TryDequeue(out _)) { }
        }
    }
}
