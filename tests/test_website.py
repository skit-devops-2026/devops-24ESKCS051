import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = PROJECT_ROOT / "frontend"


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
                    (FRONTEND_DIR / page).is_file(),
                    f"frontend/{page} should exist"
                )

    def test_html_pages_are_not_empty(self):
        pages = [
            "index.html",
            "booking.html",
            "admin.html",
        ]

        for page in pages:
            with self.subTest(page=page):
                content = (FRONTEND_DIR / page).read_text(
                    encoding="utf-8"
                ).strip()

                self.assertGreater(
                    len(content),
                    100,
                    f"frontend/{page} appears to be empty or incomplete"
                )

    def test_stylesheet_exists(self):
        self.assertTrue(
            (FRONTEND_DIR / "style.css").is_file(),
            "frontend/style.css should exist"
        )

    def test_javascript_file_exists(self):
        self.assertTrue(
            (FRONTEND_DIR / "script.js").is_file(),
            "frontend/script.js should exist"
        )


if __name__ == "__main__":
    unittest.main()