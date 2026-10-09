import os
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
FRONTEND_ROOT = os.path.join(PROJECT_ROOT, "frontend")
START_TIME = time.time()
REQUEST_COUNT = 0
REQUEST_LOCK = threading.Lock()


class ZenithHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_ROOT, **kwargs)

    def do_GET(self):
        global REQUEST_COUNT

        with REQUEST_LOCK:
            REQUEST_COUNT += 1

        if self.path == "/health":
            self.send_json(200, '{"status":"ok"}')
            return

        if self.path == "/metrics":
            self.send_metrics()
            return

        if self.path == "/":
            self.path = "/index.html"

        super().do_GET()

    def send_json(self, status, body):
        encoded_body = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded_body)))
        self.end_headers()
        self.wfile.write(encoded_body)

    def send_metrics(self):
        with REQUEST_LOCK:
            request_count = REQUEST_COUNT

        body = (
            "# HELP zenith_http_requests_total Total HTTP requests received.\n"
            "# TYPE zenith_http_requests_total counter\n"
            f"zenith_http_requests_total {request_count}\n"
            "# HELP zenith_uptime_seconds Seconds since the server started.\n"
            "# TYPE zenith_uptime_seconds gauge\n"
            f"zenith_uptime_seconds {time.time() - START_TIME:.2f}\n"
        ).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; version=0.0.4")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        print("%s - %s" % (self.address_string(), format % args))


def main():
    port = int(os.environ.get("PORT", "8080"))
    server = ThreadingHTTPServer(("0.0.0.0", port), ZenithHandler)
    print(f"Zenith serving frontend on port {port}")
    server.serve_forever()


if __name__ == "__main__":
    main()