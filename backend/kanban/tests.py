from django.test import TestCase

from kanban import models


class KanbanColumnModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        col = models.KanbanColumn()
        col.name = "To Do"
        col.position = 0
        col.save()

        card = models.KanbanCard()
        card.name = "make pizza"
        card.column = col
        card.save()

    def test_get_card_0(self):
        response = self.client.get("/kanban/cards/1", follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_card_0_name(self):
        response = self.client.get("/kanban/cards/1", follow=True)
        self.assertEqual(response.json()["name"], "make pizza")

    def test_get_card_0_col(self):
        response = self.client.get("/kanban/cards/1", follow=True)
        self.assertEqual(response.json()["column"], 1)


#    def test_post_card_0(self):
