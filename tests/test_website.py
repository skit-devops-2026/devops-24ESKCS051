import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent


class TestZenithWebsite(unittest.TestCase):

    def test_required_pages_exist(self):
        required_pages = [
            "index.html",
            "booking.html",
            "admin.html",
        ]

        for page in required_pages:
            with self.subTest(page=page):
                self.assertTrue(
                    (PROJECT_ROOT / page).is_file(),
                    f"{page} should exist"
                )

    def test_html_pages_are_not_empty(self):
        pages = [
            "index.html",
            "booking.html",
            "admin.html",
        ]

        for page in pages:
            with self.subTest(page=page):
                content = (PROJECT_ROOT / page).read_text(
                    encoding="utf-8"
                ).strip()

                self.assertGreater(
                    len(content),
                    100,
                    f"{page} appears to be empty or incomplete"
                )

    def test_stylesheet_exists(self):
        self.assertTrue(
            (PROJECT_ROOT / "style.css").is_file(),
            "style.css should exist"
        )

    def test_javascript_file_exists(self):
        self.assertTrue(
            (PROJECT_ROOT / "script.js").is_file(),
            "script.js should exist"
        )


if __name__ == "__main__":
    unittest.main()