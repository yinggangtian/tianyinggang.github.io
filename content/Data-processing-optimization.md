---
title: "Data Processing Optimization"
date: "2020-03-14"
tags: ["Machine Learning", "Data Processing"]
excerpt: "Optimization of model data preprocessing methods in industrial practice"
---
# Data Processing in Industrial Practice

In industrial practice, the tasks and data environments we face vary widely, and we usually need to write our own data processing programs suitable for the task at hand. These programs generally involve the following five key components:

- **Data Reading and Loading**
- **Dataset Partitioning**
- **Batch Data Generation**
- **Training Sample Shuffling**
- **Data Validity Verification**

## Data Storage Formats

In practice, there are various data storage formats that are saved locally. For example, the MNIST dataset is stored locally in JSON format with the following data structure:

The `data` object contains a list of three elements: `train_set`, `val_set`, and `test_set`, comprising 50,000 training samples, 10,000 validation samples, and 10,000 test samples respectively. Each sample contains handwritten digit images and their corresponding labels.

- **train_set**: Used to determine model parameters during training
- **val_set**: Used to tune model hyperparameters (e.g., selecting optimal network architectures, regularization weights)
- **test_set**: Used to estimate application performance on unseen data, providing a closer approximation to real-world model performance

### Training Set Structure

The `train_set` contains a list of two elements: `train_images` and `train_labels`.

- **train_images**: A two-dimensional array of shape `[50000, 784]` containing 50,000 images. Each image is represented by a vector of length 784, containing pixel grayscale values for a `28×28` grayscale image.
- **train_labels**: An array of shape `[50000, ]` representing the corresponding classification labels for these images (digits between `0-9`).

To read the MNIST data from the local `./work/` directory with filename `mnist.json.gz` and split it into training, validation, and test sets, use the following sample code:

### Training Sample Shuffling and Batch Data Generation

### Shuffling Training Samples

- Create an index collection `index_list` by numbering the samples sequentially
- Shuffle the `index_list` randomly
- Read the data in the shuffled order

**Important Notes**:
> Through extensive experimentation, it has been found that models are more influenced by data that appears later in training. As training progresses, the final few batches of data have a greater impact on the final model parameters. To prevent this recency bias from affecting training effectiveness, sample shuffling is essential.

### Generate Batch Data

- First, set a reasonable `batch_size`
- Convert the data to `np.array` format that meets the model input requirements
- When returning data, use Python generators with `yield` to minimize memory usage

Before implementing these operations, encapsulate the data processing code into a `load_data` function that can be called later. The `load_data` function supports three modes:

- **train**: Returns the training set data
- **valid**: Returns the validation set data
- **eval**: Returns the test set data

## Data Validity Verification

In practical applications, raw data may contain inaccurate labels, data corruption, or format inconsistencies. Therefore, after completing the data processing pipeline, data validation is required. Common validation approaches include:

- **Automated Validation**: Add validation checks and data cleaning operations, for example:
  - Use `assert` statements to verify that the number of images matches the number of labels

- **Manual Validation**:
  - Print data output results and observe whether they match the expected format
  - Verify the effectiveness of data processing and loading through training results

## Optimized Data Loading: Asynchronous Data Reading

For scenarios with large datasets and slow data loading, **asynchronous data reading** is recommended. With asynchronous data reading, data loading and model training are executed in parallel, thus accelerating data throughput while trading a small amount of memory for improved data loading efficiency.

### Comparison of Synchronous vs. Asynchronous Data Reading

- **Synchronous Data Reading**:
  - Data loading is executed serially with model training
  - The data loading function runs only when the model needs data to obtain the current batch
  - During data loading periods, the model must wait for data loading to complete before continuing training, resulting in slower overall throughput

- **Asynchronous Data Reading**:
  - Data loading is executed in parallel with model training
  - Read data is continuously placed into a buffer, and the next round of data loading can be initiated without waiting for model training to complete
  - When the model finishes training a batch, it can immediately obtain the next batch of data from the buffer without waiting for the data loading process, thus accelerating overall training speed

- **Asynchronous Queue**:
  - Serves as a **buffer** for data loading and model training interaction
  - Can both store read data and provide data for model training
  - Decouples the work pace of data loading and model training, improving overall efficiency
