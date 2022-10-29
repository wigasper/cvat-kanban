# syntax=docker/dockerfile:1
FROM python:3.10.2-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /src

COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend .
