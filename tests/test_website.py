import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent
CLIENT_DIR = PROJECT_ROOT / "client"
SOURCE_DIR = CLIENT_DIR / "src"


class TestZenithWebsite(unittest.TestCase):

    def test_required_pages_exist(self):
        required_pages = [
            "index.html",
            "package.json",
            "package-lock.json",
        ]

        for page in required_pages:
            with self.subTest(page=page):
                self.assertTrue(
                    (CLIENT_DIR / page).is_file(),
                    f"client/{page} should exist"
                )

    def test_html_pages_are_not_empty(self):
        pages = [
            "index.html",
            "package.json",
            "package-lock.json",
        ]

        for page in pages:
            with self.subTest(page=page):
                content = (CLIENT_DIR / page).read_text(
                    encoding="utf-8"
                ).strip()

                self.assertGreater(
                    len(content),
                    100,
                    f"client/{page} appears to be empty or incomplete"
                )

    def test_stylesheet_exists(self):
        self.assertTrue(
            (SOURCE_DIR / "index.css").is_file(),
            "client/src/index.css should exist"
        )

    def test_javascript_file_exists(self):
        self.assertTrue(
            (SOURCE_DIR / "main.jsx").is_file(),
            "client/src/main.jsx should exist"
        )


if __name__ == "__main__":
    unittest.main()