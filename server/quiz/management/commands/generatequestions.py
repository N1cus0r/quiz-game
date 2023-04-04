from random import choice
from requests import get as GET
from django.core.management.base import BaseCommand

from quiz.models import Question, GameType


class Command(BaseCommand):
    help = "Random question generation"

    def handle(self, *args, **options):
        if Question.objects.all().exists():
            Question.objects.all().delete()
            print("Deleting previous questions...")

        response = GET("https://restcountries.com/v3.1/all")
        json = response.json()
        count, total_count = 0, len(json)

        for obj in json:
            country_flag = obj["flags"]["png"]
            country_name = obj["name"]["common"]
            country_capital = obj.get("capital")

            if not country_capital:
                continue
            else:
                country_capital = country_capital[0]

            game_type = choice([GameType.GUESS_CAPITAL, GameType.GUESS_FLAG])
            if game_type == GameType.GUESS_CAPITAL:
                question_text = f"What is the capital of {country_name} ?"
                question_answer = country_capital
            else:
                question_text = "Which country does this flag belong to ?"
                question_answer = country_name
            question_image = country_flag

            Question.objects.create(
                text=question_text,
                answer=question_answer,
                image=question_image,
                game_type=game_type,
            )

            print(f"{count} out of {total_count}")
            print(country_name, country_capital, sep=" | ")
            count += 1

        print("(Were only selected countries with a capital)")
