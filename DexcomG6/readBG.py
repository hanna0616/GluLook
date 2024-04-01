from pydexcom import Dexcom
dexcom = Dexcom("hanna.k0616@gmail.com", "Abc980616.", ous=True)
glucose_reading = dexcom.get_current_glucose_reading()


print(glucose_reading)
print(glucose_reading.value)
print(glucose_reading.mmol_l)
print(glucose_reading.trend)
print(glucose_reading.trend_direction)
print(glucose_reading.trend_description)
print(glucose_reading.trend_arrow)


