import gym
from time import sleep
import json
import sys
# name = input("environment: ")
name = "CartPole-v0"
env = gym.make(name)
env.reset()

while True:
  ob = env.reset()
  print(json.dumps({ 'ob': ob.tolist() }))
  sys.stdout.flush()
  while True:
    try:
      env.render()
      action = int(sys.stdin.readline())
      ob, reward, done, _ = env.step(action)
      print(json.dumps({
        'ob': ob.tolist(),
        'reward': reward,
        'done': done
      }))
      sys.stdout.flush()
      if done:
        break
    except:
      print("Unexpected error:", sys.exc_info()[0])
