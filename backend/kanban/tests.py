from django.test import TestCase

from kanban import models


class KanbanColumnModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        col_0 = models.KanbanColumn()
        col_0.name = "To Do"
        col_0.position = 0
        col_0.save()

        card = models.KanbanCard()
        card.name = "make pizza"
        card.column = col_0
        card.save()

        col_1 = models.KanbanColumn()
        col_1.name = "To Do"
        col_1.save()

    def test_get_card_0(self):
        response = self.client.get("/kanban/cards/1", follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_card_0_name(self):
        response = self.client.get("/kanban/cards/1", follow=True)
        self.assertEqual(response.json()["name"], "make pizza")

    def test_get_card_0_col(self):
        response = self.client.get("/kanban/cards/1", follow=True)
        self.assertEqual(response.json()["column"], 1)

    def test_column_default_position_0(self):
        response = self.client.get("/kanban/columns/2", follow=True)
        self.assertEqual(response.json()["position"], 1)


class KanbanCardModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        col_0 = models.KanbanColumn()
        col_0.name = "To Do"
        col_0.position = 0
        col_0.save()

        card_0 = models.KanbanCard()
        card_0.name = "water plants"
        card_0.column = col_0
        card_0.save()

        card_1 = models.KanbanCard()
        card_1.name = "feed dog"
        card_1.column = col_0
        card_1.save()

    def test_card_default_position_0(self):
        response = self.client.get("/kanban/cards/1", follow=True)
        self.assertEqual(response.json()["position"], 0)

    def test_card_default_position_1(self):
        response = self.client.get("/kanban/cards/2", follow=True)
        self.assertEqual(response.json()["position"], 1)
