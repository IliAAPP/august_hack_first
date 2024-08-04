import telebot
from telebot import types
import pandas as pd

API_TOKEN = '7271826274:AAGG07ofWOJkWBmnP6lzHFV2oFrk0DSA71g'
bot = telebot.TeleBot(API_TOKEN)

# Загружаем данные о работодателях
employers_df = pd.read_excel('employers.xlsx')
employers_df['skills'] = employers_df['skills'].apply(lambda x: x.split(','))

# Убедитесь, что зарплатные ожидания и уровни приведены к числовому типу
employers_df['salary'] = employers_df['salary'].astype(float)
employers_df['level'] = employers_df['level'].astype(int)

user_data = {}

# Функция для расчета процента соответствия
def calculate_match(worker, employer):
    skill_match = len(set(worker['skills']).intersection(set(employer['skills']))) / len(worker['skills']) * 100
    salary_match = (1 - abs(float(worker['salary']) - float(employer['salary'])) / max(
        float(worker['salary']), float(employer['salary']))) * 100
    location_match = 100 if worker['location'] == employer['location'] else 0
    schedule_match = 100 if worker['schedule'] == employer['schedule'] else 0
    level_match = 100 - abs(int(worker['level']) - int(employer['level'])) * 10

    # Рассчитываем средний процент совпадения
    total_match = (skill_match + salary_match + location_match + schedule_match + level_match) / 5
    return total_match

# Стартовое сообщение
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.send_message(message.chat.id, "Добро пожаловать! Как вас зовут?")
    bot.register_next_step_handler(message, get_name)

def get_name(message):
    user_id = message.chat.id
    user_data[user_id] = {'name': message.text}
    bot.send_message(user_id, "Какие у вас навыки?")

    markup = types.ReplyKeyboardMarkup(one_time_keyboard=True)
    markup.add('math', 'tech', 'dev')
    bot.send_message(user_id, "Выберите ваши навыки", reply_markup=markup)
    bot.register_next_step_handler(message, get_skills)

def get_skills(message):
    user_id = message.chat.id
    user_data[user_id]['skills'] = message.text.split(',')
    bot.send_message(user_id, "Какая у вас ожидаемая зарплата? (напишите число)")
    bot.register_next_step_handler(message, get_salary)

def get_salary(message):
    user_id = message.chat.id
    user_data[user_id]['salary'] = message.text

    markup = types.ReplyKeyboardMarkup(one_time_keyboard=True)
    markup.add('Krasnodar', 'Moscow', 'Sochi')
    bot.send_message(user_id, "Где вы находитесь?", reply_markup=markup)
    bot.register_next_step_handler(message, get_location)

def get_location(message):
    user_id = message.chat.id
    user_data[user_id]['location'] = message.text

    markup = types.ReplyKeyboardMarkup(one_time_keyboard=True)
    markup.add('9:00-18:00', '10:00-18:00', '8:00-17:00')
    bot.send_message(user_id, "Выберите ваш график работы", reply_markup=markup)
    bot.register_next_step_handler(message, get_schedule)

def get_schedule(message):
    user_id = message.chat.id
    user_data[user_id]['schedule'] = message.text

    markup = types.ReplyKeyboardMarkup(one_time_keyboard=True)
    markup.add('1', '2', '3', '4', '5', '6')
    bot.send_message(user_id, "Выберите ваш уровень подготовленности", reply_markup=markup)
    bot.register_next_step_handler(message, get_level)

def get_level(message):
    user_id = message.chat.id
    user_data[user_id]['level'] = message.text

    worker = user_data[user_id]
    best_match_percentage = 0
    best_employer = None
    results = []

    for _, employer in employers_df.iterrows():
        match_percentage = calculate_match(worker, employer)
        results.append({
            'worker': worker['name'],
            'employer': employer['name'],
            'phone_num': str(employer['phone_num']),
            'match_percentage': match_percentage
        })

        if match_percentage > best_match_percentage:
            best_match_percentage = match_percentage
            best_employer = employer['name']

    results_df = pd.DataFrame(results)
    # Преобразование столбца phone_num в строку
    results_df['phone_num'] = results_df['phone_num'].astype(str)
    results_df.to_excel('matches.xlsx', index=False)

    # Завершающее сообщение с данными пользователя и лучшим совпадением
    bot.send_message(user_id, f"Спасибо! Вот ваши данные:\n"
                              f"Имя: {worker['name']}\n"
                              f"Навыки: {', '.join(worker['skills'])}\n"
                              f"Ожидаемая зарплата: {worker['salary']}\n"
                              f"Местоположение: {worker['location']}\n"
                              f"График: {worker['schedule']}\n"
                              f"Уровень: {worker['level']}\n\n"
                              f"Лучшее совпадение в вашем регионе: работодатель {best_employer} с процентом соответствия {best_match_percentage:.2f}%")

    with open('matches.xlsx', 'rb') as file:
        bot.send_document(user_id, file)

if __name__ == '__main__':
    bot.polling(none_stop=True)
