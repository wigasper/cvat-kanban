from django.urls import reverse
from django.test import TestCase
from django.contrib.auth.models import User

from kanban import models

# TODO set up these tests differently
# do not need the setup like this, problematic
# as pks will vary based on other tests


class KanbanColumnModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_user = User.objects.create_user(username="testuser", password="23wesdxc")
        test_user.save()

    def test_post_column_0(self):
        login = self.client.login(username="testuser", password="23wesdxc")

        column = {"name": "Done", "position": 2}

        response = self.client.post(reverse("kanban:columns-list"), column)
        self.assertEqual(response.status_code, 201)

    def test_get_column_0(self):
        col = models.KanbanColumn()
        col.name = "To Do"
        col.save()

        response = self.client.get(f"/kanban/columns/{col.pk}", follow=True)
        self.assertEqual(response.status_code, 200)

    def test_column_default_position_0(self):
        col_0 = models.KanbanColumn()
        col_0.name = "To Do"
        col_0.save()

        existing_positions = []

        for col in models.KanbanColumn.objects.all():
            existing_positions.append(col.position)

        expected = sorted(existing_positions)[-1]

        response = self.client.get(f"/kanban/columns/{col_0.pk}", follow=True)
        self.assertEqual(response.json()["position"], expected)


class KanbanCardModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_user = User.objects.create_user(username="testuser", password="23wesdxc")
        test_user.save()

    def test_post_card_0(self):
        login = self.client.login(username="testuser", password="23wesdxc")

        col_0 = models.KanbanColumn()
        col_0.name = "To Do"
        col_0.position = 0
        col_0.save()

        card = {"name": "brush dog", "column": col_0.pk}

        response = self.client.post(reverse("kanban:cards-list"), card)
        self.assertEqual(response.status_code, 201)

    def test_get_card_0(self):
        card = models.KanbanCard()
        card.name = "make pizza"
        card.save()

        response = self.client.get(f"/kanban/cards/{card.pk}", follow=True)
        self.assertEqual(response.status_code, 200)

    def test_get_card_0_name(self):
        card = models.KanbanCard()
        card.name = "make pizza"
        card.save()

        response = self.client.get(f"/kanban/cards/{card.pk}", follow=True)
        self.assertEqual(response.json()["name"], "make pizza")

    def test_get_card_0_col(self):
        col_0 = models.KanbanColumn()
        col_0.name = "To Do"
        col_0.position = 0
        col_0.save()

        card = models.KanbanCard()
        card.name = "make pizza"
        card.column = col_0
        card.save()

        response = self.client.get(f"/kanban/cards/{card.pk}", follow=True)
        self.assertEqual(response.json()["column"], col_0.pk)

    def test_card_default_position_0(self):
        card = models.KanbanCard()
        card.name = "make pizza"
        card.save()

        existing_positions = []

        for card in models.KanbanCard.objects.all():
            existing_positions.append(card.position)

        expected = sorted(existing_positions)[-1]

        response = self.client.get(f"/kanban/cards/{card.pk}", follow=True)
        self.assertEqual(response.json()["position"], expected)

    def test_card_default_position_1(self):
        card = models.KanbanCard()
        card.name = "make pizza"
        card.position = 8
        card.save()

        card_1 = models.KanbanCard()
        card_1.name = "make more pizza"
        card_1.save()

        existing_positions = []

        for card in models.KanbanCard.objects.all():
            existing_positions.append(card.position)

        expected = sorted(existing_positions)[-1]

        response = self.client.get(f"/kanban/cards/{card_1.pk}", follow=True)
        self.assertEqual(response.json()["position"], expected)
