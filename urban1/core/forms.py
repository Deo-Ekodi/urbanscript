from django import forms

class RoomForm(forms.Form):
    description = forms.CharField(widget=forms.Textarea, required=False)
    image = forms.ImageField(required=False)
