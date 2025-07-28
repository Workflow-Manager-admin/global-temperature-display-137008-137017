#!/bin/bash
cd /home/kavia/workspace/code-generation/global-temperature-display-137008-137017/weather_dual_unit_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

