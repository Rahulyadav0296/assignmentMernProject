from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Data Cleaning Script
def clean_data(file_path, output_file='cleaned_data.csv'):
    # Read CSV file
    df = pd.read_csv(file_path)

    # Drop rows with missing values
    cleaned_df = df.dropna()

    # Output the cleaned data to a specified CSV file
    cleaned_df.to_csv(output_file, index=False)

    print(f"Cleaned data has been saved to {output_file}")
    
    return cleaned_df

# Example usage
file_path = "C://Users//expert//Downloads//users.csv"
output_file = "C://Users//expert//Downloads//cleaned_data.csv"
cleaned_data = clean_data(file_path, output_file)

# Display the cleaned data
print("Cleaned Data:")
print(cleaned_data.head())


# Function to calculate age from birthdate
def calculate_age(birthdate):
    birthdate = pd.to_datetime(birthdate)
    today = datetime.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age

# Filter rows where the calculated age is greater than the specified value
def topRowsAge(df, column_name, value):
    df['calculated_age'] = df[column_name].apply(calculate_age)
    filtered_data = df[df['calculated_age'] > value]
    return filtered_data.head(5)

df = pd.read_csv("C://Users//expert//Downloads//cleaned_data.csv")

result = topRowsAge(df, "age", 30)

# Output the result
print("Top 5 rows where age > 30:")
print(result)


# plot age distribution 
def plot_age_distribution(df):
    plt.figure(figsize=(8, 6))
    df['age'].value_counts().sort_index().plot(kind='bar', color='skyblue')

    plt.title("Age Distribution")
    plt.xlabel("Age")
    plt.ylabel("Frequency")
    plt.show()

plot_age_distribution(df)

# Find the mean, median and deviation of the age 
def calculate_statistics(df, column_name):
    df['calculated_age'] = df[column_name].apply(calculate_age)
    mean = np.mean(df['calculated_age'])
    median = np.median(df['calculated_age'])
    std_deviation = np.std(df['calculated_age'])

    return mean, median, std_deviation 

mean_age, median_age, std_age = calculate_statistics(df, "age")
print(f"Mean Age: {mean_age}")
print(f"Median Age: {median_age}")
print(f"Standard Deviation of Age: {std_age}")


