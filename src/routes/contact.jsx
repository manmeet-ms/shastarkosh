import { createFileRoute } from '@tanstack/react-router'
import LandingHeader from '../components/Header/LandingHeader'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LandingFooter from '../components/Footer/LandingFooter';
import { toast } from 'sonner'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent({
  title = "Contact Shastarkosh",
  description = "Have questions about ancient Indian scriptures, weapons, or our digital library? We're here to help preserve and share this invaluable knowledge.",
  phone = "+91 (XXX) XXX-XXXX",
  email = "contact@shastarkosh.com",
  web = { label: "shastarkosh.com", url: "https://shastarkosh.com" },
}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Replace with your actual backend endpoint
      const response = await axios.post('/api/contact', {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (response.data.success) {
        toast.success({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });
        reset();
      }
    } catch (error) {
      toast.error({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <>
  <LandingHeader/>

   <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name *</Label>
                <Input 
                  type="text" 
                  id="firstname" 
                  placeholder="First Name" 
                  {...register('firstname', { required: 'First name is required' })}
                />
                {errors.firstname && (
                  <span className="text-xs text-red-500">{errors.firstname.message}</span>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name *</Label>
                <Input 
                  type="text" 
                  id="lastname" 
                  placeholder="Last Name" 
                  {...register('lastname', { required: 'Last name is required' })}
                />
                {errors.lastname && (
                  <span className="text-xs text-red-500">{errors.lastname.message}</span>
                )}
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="your.email@example.com" 
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <span className="text-xs text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject *</Label>
              <Input 
                type="text" 
                id="subject" 
                placeholder="What is this regarding?" 
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && (
                <span className="text-xs text-red-500">{errors.subject.message}</span>
              )}
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message *</Label>
              <Textarea 
                placeholder="Tell us more about your inquiry..." 
                id="message" 
                rows={6}
                {...register('message', { 
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters'
                  }
                })}
              />
              {errors.message && (
                <span className="text-xs text-red-500">{errors.message.message}</span>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
<LandingFooter/>

  </>
}
