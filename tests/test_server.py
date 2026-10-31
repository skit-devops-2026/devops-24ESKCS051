import threading
import unittest
from http.client import HTTPConnection

from server import ThreadingHTTPServer, ZenithHandler


class TestZenithServer(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.httpd = ThreadingHTTPServer(("127.0.0.1", 0), ZenithHandler)
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.thread.join()

    def get(self, path):
        connection = HTTPConnection("127.0.0.1", self.httpd.server_port)
        connection.request("GET", path)
        response = connection.getresponse()
        body = response.read().decode("utf-8")
        connection.close()
        return response.status, body

    def test_health_endpoint(self):
        status, body = self.get("/health")
        self.assertEqual(status, 200)
        self.assertEqual(body, '{"status":"ok"}')

    def test_metrics_endpoint_exposes_live_metrics(self):
        status, body = self.get("/metrics")
        self.assertEqual(status, 200)
        self.assertIn("zenith_http_requests_total", body)
        self.assertIn("zenith_uptime_seconds", body)

    def test_root_serves_frontend(self):
        status, body = self.get("/")
        self.assertEqual(status, 200)
        self.assertIn("Campus Room Booking", body)


if __name__ == "__main__":
    unittest.main()