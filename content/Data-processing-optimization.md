---
title: "Data processing optimization"
date: "2020-03-14"
tags: ["Machine Learning", "Data Processing"]
excerpt: "Optimization of model data preprocessing methods"
---
# Data processing in industrial practice

In industrial practice, the tasks and data environments we face vary widely, and we usually need to write our own data processing programs suitable for the task at hand, which generally involve the following five links:

- **Reading in the data
- **Dividing the data set
- **Generate batch data
- **Training the sample set to disorganize the data
- **Checking data validity

## Data Storage Format

In practice, there are various data storage formats that are saved locally. For example, the MNIST dataset is stored locally in JSON format with the following data storage structure:

`data` contains a list of three elements: `train_set`, `val_set`, `test_set`, including 50,000 training samples, 10,000 validation samples, and 10,000 test samples. Each sample contains handwritten digit images and corresponding labels.

- **train_set**: used to determine the model parameters.
- **val_set**: used to tune the model hyper-parameters (e.g. multiple network structures, optimal choice of regularization weights).
- **test_set (test set)**: used to estimate the application effect (data that has not been applied in the model, closer to the effect of the model applied in real scenarios).

### Structure of the training set

`train_set` contains a list of two elements: `train_images` and `train_labels`.

- **train_images**: a two-dimensional list of shape `[50000, 784]` containing 50000 images. Each image is represented by a vector of length 784 with pixel grayscale values of size `28×28` (black and white images).
- **train_labels**: a list of shape `[50000, ]`, representing the corresponding categorization labels of these images, i.e. a number between `0-9`.

Read the list in the local `. /work/` directory, read the MNIST data with filename `mnist.json.gz` and split it into training set, validation set and test set, the sample code is as follows.

### Training Sample Disorder and Batch Data Generation

### Disordering training samples

- Create an ID collection `index_list` by numbering the samples sequentially.
- Disorder the `index_list`.
- Read the data in the disordered order.

**Notes**:
> Through extensive experimentation, it has been found that the model is more impressed with the data that appears last. After the training data is imported, the closer to the end of model training, the greater the impact of the last few batches of data on the model parameters. In order to avoid the model memory affecting the training effect, sample disorder operation is needed.

### Generate batch data

- First, set a reasonable `batch_size`.
- Convert the data to `np.array` format that meets the model input requirements.
- When returning data, set the Python generator to `yield` mode to minimize memory usage.

Before you can do either of these things, you need to encapsulate the data processing code into a `load_data` function that you can call later. `load_data` has three modes:

- **train**: returns the training set data.
- **valid**: returns the validation data.
- **eval**: returns the test data.

## Calibrate data validity

In practical applications, the original data may have inaccurate labeling, data clutter or format inconsistency. Therefore, after completing the data processing process, data validation is required, and the common ways are as follows:

- **Machine validation**: add some validation and clean up data operations, for example:
  - Use `assert` statement to check whether the number of images and label data are consistent.

- **Manual validation**:
  - Print the data output results first and observe whether it matches the expected format.
  - Verify the validity of data processing and reading by training results.

## Encapsulated data reading: asynchronous data reading

For scenarios with large sample size and slow data reading, it is recommended to use **asynchronous data reading**. When reading data asynchronously, data reading and model training are executed in parallel, thus speeding up data reading and sacrificing a small portion of memory in exchange for improved data reading efficiency.

### Comparison of synchronous and asynchronous data reading

- **Synchronous data reading**:
  - Data reading is executed serially with model training.
  - Data reading is performed serially with model training. The data reading function is run only when the model needs data to get the current batch of data.
  - During the data reading period, the model must wait for the data reading to complete before it can continue training, so the data reading speed is slower.

- **Asynchronous data reading**:
  - Data reading is executed in parallel with model training.
  - The read data is continuously placed into the cache, and the next round of data reading can be initiated without waiting for the model training to complete.
  - When the model has finished training a batch, there is no need to wait for the data reading process, and the next batch of data is directly obtained from the cache for training, thus speeding up the data reading speed.

- **Asynchronous Queue**:
  - Serves as a **repository** for data reading and model training interaction.
  - It can both store the read data and provide data for model training.
  - This decouples the work pace of data reading and model training and improves overall efficiency.

Translated with DeepL.com (free version)